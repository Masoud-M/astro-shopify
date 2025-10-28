import { promises as fs } from "fs";
import { join } from "path";
import readline from "readline";
import { collectFiles } from "./utils/collect-files.js";
import { replaceInFiles } from "./utils/replace-in-files.js";

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
		let movedCount = 0;
		for (const file of blogLayoutFiles) {
			const sourcePath = join(blogLayoutsPath, file);
			const destPath = join(blogLayoutsDestination, file);

			try {
				// Check if destination already exists and remove it
				try {
					await fs.access(destPath);
					await fs.rm(destPath, { force: true });
				} catch {
					// Destination doesn't exist, which is fine
				}

				await fs.rename(sourcePath, destPath);
				console.log(`Moved ${sourcePath} to ${destPath}`);
				movedCount++;
			} catch (error) {
				console.error(`Error moving ${sourcePath}: ${error.message}`);
			}
		}

		return movedCount;
	} catch (error) {
		console.error(`Error moving blog layouts: ${error.message}`);
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
 * Clean up navData.json by removing blog navigation link
 */
async function cleanupNavData() {
	console.log("\nCleaning up navData.json...");

	const navDataPath = join(process.cwd(), "src", "data", "navData.json");

	try {
		// Check if file exists
		await fs.access(navDataPath);

		const content = await fs.readFile(navDataPath, "utf-8");
		const navData = JSON.parse(content);

		// Filter out the blog entry
		const filteredNavData = navData.filter(item => {
			return item.key !== "Blog" && item.url !== "/blog/";
		});

		// Write back the updated JSON with proper formatting
		await fs.writeFile(navDataPath, JSON.stringify(filteredNavData, null, 2) + "\n", "utf-8");
		console.log("Cleaned up navData.json (Blog link removed)");
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log("navData.json not found, skipping...");
		} else {
			console.error(`Error cleaning up navData.json: ${error.message}`);
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

			// Check if destination already exists and remove it
			try {
				await fs.access(adminDestinationPath);
				await fs.rm(adminDestinationPath, { recursive: true, force: true });
				console.log(`Removed existing ${adminDestinationPath}`);
			} catch {
				// Destination doesn't exist, which is fine
			}

			await fs.rename(adminSourcePath, adminDestinationPath);
			console.log(`Moved ${adminSourcePath} to ${adminDestinationPath}`);
		} catch (error) {
			if (error.code === 'ENOENT') {
				console.log(`Admin folder not found at ${adminSourcePath}, skipping...`);
			} else {
				console.error(`Error moving admin folder: ${error.message}`);
			}
		}

		// Move the admin.astro page
		try {
			await fs.access(adminPagePath);

			// Check if destination already exists and remove it
			try {
				await fs.access(adminPageDestinationPath);
				await fs.rm(adminPageDestinationPath, { force: true });
				console.log(`Removed existing ${adminPageDestinationPath}`);
			} catch {
				// Destination doesn't exist, which is fine
			}

			await fs.rename(adminPagePath, adminPageDestinationPath);
			console.log(`Moved ${adminPagePath} to ${adminPageDestinationPath}`);
		} catch (error) {
			if (error.code === 'ENOENT') {
				console.log(`Admin page not found at ${adminPagePath}, skipping...`);
			} else {
				console.error(`Error moving admin page: ${error.message}`);
			}
		}

		// Move blog content if requested
		if (removeBlogContent) {
			// Move blog content folder
			try {
				await fs.access(blogContentPath);

				// Check if destination already exists and remove it
				try {
					await fs.access(blogContentDestination);
					await fs.rm(blogContentDestination, { recursive: true, force: true });
					console.log(`Removed existing ${blogContentDestination}`);
				} catch {
					// Destination doesn't exist, which is fine
				}

				await fs.rename(blogContentPath, blogContentDestination);
				console.log(`Moved ${blogContentPath} to ${blogContentDestination}`);
			} catch (error) {
				if (error.code === 'ENOENT') {
					console.log(`Blog content folder not found at ${blogContentPath}, skipping...`);
				} else {
					console.error(`Error moving blog content: ${error.message}`);
				}
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

				// Check if destination already exists and remove it
				try {
					await fs.access(blogPagesDestination);
					await fs.rm(blogPagesDestination, { recursive: true, force: true });
					console.log(`Removed existing ${blogPagesDestination}`);
				} catch {
					// Destination doesn't exist, which is fine
				}

				await fs.rename(blogPagesPath, blogPagesDestination);
				console.log(`Moved ${blogPagesPath} to ${blogPagesDestination}`);
			} catch (error) {
				if (error.code === 'ENOENT') {
					console.log(`Blog pages folder not found at ${blogPagesPath}, skipping...`);
				} else {
					console.error(`Error moving blog pages: ${error.message}`);
				}
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

		// Clean up blog imports if blog content was removed
		if (removeBlogContent) {
			await cleanupBlogImports();
			await cleanupContentConfig();
			await cleanupNavData();
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
