formatLine = (dataObject) => {
    // Extract the item hash and perks array
    const { hash, plugs } = dataObject;
    
    // Generate all combinations of perks
    const combinations = generatePerkCombinations(plugs);
    
    // Create DIM wishlist lines for each combination
    const lines = combinations.map(perkCombo => {
        const perksString = perkCombo.join(',');
        return `dimwishlist:item=${hash}&perks=${perksString}`;
    });
    
    return lines;
}

// Helper function to generate all combinations of perks from the plugs array
function generatePerkCombinations(plugs) {
    if (!plugs || plugs.length === 0) return [[]];
    
    // Start with empty combination and build up
    let combinations = [[]];
    
    // Process all perk arrays uniformly
    for (let i = 0; i < plugs.length; i++) {
        const newCombinations = [];
        for (const combo of combinations) {
            for (const perk of plugs[i]) {
                newCombinations.push([...combo, perk]);
            }
        }
        combinations = newCombinations;
    }
    
    return combinations;
}

generateWishlistFile = (wishlistObject) => {
    const { name, description, data } = wishlistObject;
    
    // Start with header
    let output = `title:${name}\n`;
    output += `description:${description}\n\n`;
    
    // Process each item in the data array
    for (const item of data) {
        const { tags } = item;
        
        // Add tags as notes if they exist
        if (tags && tags.length > 0) {
            output += `//notes: tags:${tags.join(',').toLowerCase()}\n`;
        }
        
        // Generate wishlist lines for this item
        const lines = formatLine(item);
        for (const line of lines) {
            output += line + '\n';
        }
        
        // Add blank line after each item group (only if there are more items)
        output += '\n';
    }
    
    return output;
}

// Main execution function
function main() {
    const fs = require('fs');
    const path = require('path');
    
    try {
        // Get output filename from command line arguments
        const args = process.argv.slice(2);
        const outputFilename = args[0] || 'd2wishlist_latest.txt';
        
        // Read the wishlist JSON file
        const wishlistPath = path.join(__dirname, 'wishlist.json');
        const wishlistData = fs.readFileSync(wishlistPath, 'utf8');
        const wishlistObject = JSON.parse(wishlistData);
        
        // Generate the DIM format wishlist
        const dimWishlist = generateWishlistFile(wishlistObject);
        
        // Write to output file
        const outputPath = path.join(__dirname, outputFilename);
        fs.writeFileSync(outputPath, dimWishlist);
        
        console.log(`Successfully generated DIM wishlist at: ${outputPath}`);
        console.log(`Generated ${wishlistObject.data.length} item entries`);
        
    } catch (error) {
        console.error('Error generating wishlist:', error.message);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

// Export functions for potential use as a module
module.exports = {
    formatLine,
    generateWishlistFile,
    main
};

