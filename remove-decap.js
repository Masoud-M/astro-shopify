import { promises as fs } from "fs";
import { join } from "path";
import readline from "readline";
import { exec } from "child_process";
import { detectPackageManager } from "./scripts/utils/detect-package-manager.js";
import { collectFiles } from "./scripts/utils/collect-files.js";
import { replaceInFiles } from "./scripts/utils/replace-in-files.js";

// Decap CMS file and directory paths
const astroConfigPath = join("astro.config.mjs");
const adminSourcePath = join("public", "admin");
const adminPagePath = join("src", "pages", "admin.astro");
const destinationDir = join("scripts", "deleted");
const adminDestinationPath = join(destinationDir, "admin");
const adminPageDestinationPath = join(destinationDir, "admin.astro");

// Blog-related paths
const blogContentPath = join("src", "content", "blog");
const blogLayoutsPath = join("src", "layouts");
const blogPagesPath = join("src", "pages", "blog");
const blogContentDestination = join(destinationDir, "blog");
const blogLayoutsDestination = join(destinationDir, "layouts");
const blogPagesDestination = join(destinationDir, "pages-blog");

/**
 * Get the uninstall command based on package manager
 */
function getUninstallCommand(packageManager, packages) {
	const commands = {
		npm: `npm uninstall ${packages.join(" ")}`,
		yarn: `yarn remove ${packages.join(" ")}`,
		pnpm: `pnpm remove ${packages.join(" ")}`,
		bun: `bun remove ${packages.join(" ")}`,
	};
	return commands[packageManager];
}

/**
 * Move blog layout files (Blog*.astro)
 */
async function moveBlogLayouts() {
	try {
		// Create destination directory
		await fs.mkdir(blogLayoutsDestination, { recursive: true });

		// Read all files in layouts directory
		const files = await fs.readdir(blogLayoutsPath);

		// Filter for Blog*.astro files
		const blogLayoutFiles = files.filter(file =>
			file.startsWith("Blog") && file.endsWith(".astro")
		);

		// Move each blog layout file
		for (const file of blogLayoutFiles) {
			const sourcePath = join(blogLayoutsPath, file);
			const destPath = join(blogLayoutsDestination, file);
			await fs.rename(sourcePath, destPath);
			console.log(`Moved ${sourcePath} to ${destPath}`);
		}

		return blogLayoutFiles.length;
	} catch (error) {
		console.error(`Error moving blog layouts: ${error}`);
		return 0;
	}
}

/**
 * Scan for remaining Decap/blog references in the codebase
 */
async function scanForReferences(removedBlogContent) {
	console.log("\nScanning for remaining references...");

	const files = [];
	const srcDir = join(process.cwd(), "src");

	try {
		await collectFiles(files, srcDir);
	} catch (error) {
		console.error(`Error collecting files: ${error}`);
		return;
	}

	const decapReferences = [];
	const blogReferences = [];

	// Search for references in collected files
	for (const file of files) {
		try {
			const content = await fs.readFile(file, "utf-8");

			// Check for Decap/Netlify CMS references
			if (content.match(/decap|netlify-cms/i)) {
				decapReferences.push(file);
			}

			// Check for blog layout imports if blog was removed
			if (removedBlogContent && content.match(/from\s+["'].*\/layouts\/Blog.*["']/)) {
				blogReferences.push(file);
			}
		} catch (error) {
			// Skip files that can't be read
			continue;
		}
	}

	// Report findings
	if (decapReferences.length > 0) {
		console.log(`\n⚠️  Found ${decapReferences.length} file(s) with Decap CMS references:`);
		decapReferences.forEach(file => {
			console.log(`   - ${file.replace(process.cwd(), '.')}`);
		});
	}

	if (blogReferences.length > 0 && removedBlogContent) {
		console.log(`\n⚠️  Found ${blogReferences.length} file(s) with blog layout imports:`);
		blogReferences.forEach(file => {
			console.log(`   - ${file.replace(process.cwd(), '.')}`);
		});
	}

	return { decapReferences, blogReferences };
}

/**
 * Clean up blog-related imports from the codebase
 */
async function cleanupBlogImports() {
	console.log("\nCleaning up blog layout imports...");

	const srcDir = join(process.cwd(), "src");

	try {
		// Remove imports of blog layouts
		const importPatterns = [
			'import\\s+.*\\s+from\\s+["\'].*\\/layouts\\/BlogPostLayout.*["\'];?\\n?',
			'import\\s+.*\\s+from\\s+["\'].*\\/layouts\\/BlogRecentArticles.*["\'];?\\n?',
			'import\\s+.*\\s+from\\s+["\'].*\\/layouts\\/BlogRecentArticlesWithSidebar.*["\'];?\\n?'
		];

		for (const pattern of importPatterns) {
			replaceInFiles(srcDir, pattern, '', false);
		}

		console.log("Cleaned up blog layout imports");
	} catch (error) {
		console.error(`Error cleaning up imports: ${error}`);
	}
}

/**
 * Clean up content.config.ts by removing blog collection
 */
async function cleanupContentConfig() {
	console.log("\nCleaning up content.config.ts...");

	const contentConfigPath = join(process.cwd(), "src", "content.config.ts");

	try {
		// Check if file exists
		await fs.access(contentConfigPath);

		let content = await fs.readFile(contentConfigPath, "utf-8");

		// Remove the blog collection definition (including comments)
		// This regex matches from the comment line to the closing brace and semicolon
		const blogCollectionRegex = /\/\/\s*Every collection must reflect Decap's config\.yml collection schema[\s\S]*?const blogsCollection = defineCollection\(\{[\s\S]*?\}\);?\n*/;
		content = content.replace(blogCollectionRegex, "");

		// Remove "blog: blogsCollection," from the collections export
		const blogExportRegex = /blog:\s*blogsCollection,?\s*\n?/;
		content = content.replace(blogExportRegex, "");

		// Clean up any extra empty lines
		content = content.replace(/\n{3,}/g, "\n\n");

		await fs.writeFile(contentConfigPath, content, "utf-8");
		console.log("Cleaned up content.config.ts (blog collection removed)");
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log("content.config.ts not found, skipping...");
		} else {
			console.error(`Error cleaning up content.config.ts: ${error}`);
		}
	}
}

/**
 * Main function to remove Decap CMS
 */
async function removeDecapCMS() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	// First confirmation
	const userConfirmed = await new Promise((resolve) => {
		rl.question(
			"Are you sure you want to remove Decap CMS from this project? (y/n): ",
			(answer) => {
				resolve(answer.toLowerCase() === "y");
			},
		);
	});

	if (!userConfirmed) {
		console.log("Operation cancelled by the user.");
		rl.close();
		process.exit(0);
	}

	// Ask about removing blog content
	const removeBlogContent = await new Promise((resolve) => {
		rl.question(
			"Do you want to remove all blog-related content? (src/content/blog, src/layouts/Blog*.astro, src/pages/blog) (y/n): ",
			(answer) => {
				rl.close();
				resolve(answer.toLowerCase() === "y");
			},
		);
	});

	// Newline for better output formatting
	console.log();

	try {
		// Create the destination directory if it doesn't exist
		await fs.access(destinationDir).catch(async () => {
			await fs.mkdir(destinationDir, { recursive: true });
			console.log(`Created directory ${destinationDir}`);
		});

		// Move the admin folder
		try {
			await fs.access(adminSourcePath);
			await fs.rename(adminSourcePath, adminDestinationPath);
			console.log(`Moved ${adminSourcePath} to ${adminDestinationPath}`);
		} catch (error) {
			console.log(`Admin folder not found at ${adminSourcePath}, skipping...`);
		}

		// Move the admin.astro page
		try {
			await fs.access(adminPagePath);
			await fs.rename(adminPagePath, adminPageDestinationPath);
			console.log(`Moved ${adminPagePath} to ${adminPageDestinationPath}`);
		} catch (error) {
			console.log(`Admin page not found at ${adminPagePath}, skipping...`);
		}

		// Move blog content if requested
		if (removeBlogContent) {
			// Move blog content folder
			try {
				await fs.access(blogContentPath);
				await fs.rename(blogContentPath, blogContentDestination);
				console.log(`Moved ${blogContentPath} to ${blogContentDestination}`);
			} catch (error) {
				console.log(`Blog content folder not found at ${blogContentPath}, skipping...`);
			}

			// Move blog layout files
			const movedLayoutsCount = await moveBlogLayouts();
			if (movedLayoutsCount > 0) {
				console.log(`Moved ${movedLayoutsCount} blog layout file(s)`);
			} else {
				console.log(`No blog layout files found, skipping...`);
			}

			// Move blog pages folder
			try {
				await fs.access(blogPagesPath);
				await fs.rename(blogPagesPath, blogPagesDestination);
				console.log(`Moved ${blogPagesPath} to ${blogPagesDestination}`);
			} catch (error) {
				console.log(`Blog pages folder not found at ${blogPagesPath}, skipping...`);
			}
		}
	} catch (error) {
		console.error(`Error moving files: ${error}`);
	}

	// Update astro.config.mjs
	try {
		let astroConfigContent = await fs.readFile(astroConfigPath, "utf-8");

		// Remove the sitemap filter for /admin
		const sitemapFilterRegex = /filter:\s*\(page\)\s*=>\s*!page\.includes\(["']\/admin["']\),\s*\n?/;
		astroConfigContent = astroConfigContent.replace(sitemapFilterRegex, "");

		// Remove any empty lines left behind
		const emptyLineRegex = /^\s*[\r\n]/gm;
		astroConfigContent = astroConfigContent.replace(emptyLineRegex, "");

		await fs.writeFile(astroConfigPath, astroConfigContent, "utf-8");
		console.log(`Updated ${astroConfigPath}`);

		// Check for Decap packages
		const packageManager = detectPackageManager();

		// Try to uninstall Decap packages (though they're loaded via CDN)
		console.log("Checking for Decap CMS packages...");
		await new Promise((resolve, reject) => {
			const packages = [
				"decap-cms-app",
				"netlify-cms-app",
			];
			const uninstallCommand = getUninstallCommand(packageManager, packages);
			exec(uninstallCommand, (error, stdout, stderr) => {
				if (error) {
					// Package not found is expected - Decap is loaded via CDN
					console.log("No Decap CMS packages found to uninstall (loaded via CDN)");
					resolve();
					return;
				}
				console.log(stdout);
				resolve();
			});
		});

		// Clean up blog imports if blog content was removed
		if (removeBlogContent) {
			await cleanupBlogImports();
			await cleanupContentConfig();
		}

		// Scan for remaining references
		const { decapReferences, blogReferences } = await scanForReferences(removeBlogContent);

		console.log("\n...done!\n");
		console.log("=================================================");
		console.log(" Successfully removed Decap CMS from the project");
		console.log("=================================================\n");

		// Next steps
		if (decapReferences.length > 0 || (blogReferences.length > 0 && removeBlogContent)) {
			console.log("⚠️  Manual cleanup needed:");
			if (decapReferences.length > 0) {
				console.log("   - Review files with Decap CMS references listed above");
			}
			if (blogReferences.length > 0 && removeBlogContent) {
				console.log("   - Fix files with remaining blog imports (auto-cleanup attempted)");
			}
			console.log();
		}

		console.log("Next steps:");
		if (removeBlogContent) {
			console.log("1. Update any navigation/links that point to /blog");
			console.log("2. Check src/content.config.ts for blog collection definitions");
			console.log("3. Run your build to ensure everything works");
			console.log("4. All removed files are in scripts/deleted/ if you need to restore them\n");
		} else {
			console.log("1. Run your build to ensure everything works");
			console.log("2. All removed files are in scripts/deleted/ if you need to restore them\n");
		}

	} catch (error) {
		console.error(`Error updating ${astroConfigPath}: ${error}`);
	}
}

// Run the script
removeDecapCMS();
