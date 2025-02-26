import { Flex } from "@chakra-ui/react" 
function FilterNavbar() {
    return (
<<<<<<< Updated upstream
        <div className="w-64 h-screen p-6 bg-gray-200">
            {/* use Text to replace h2 */}
=======
        <div className="w-64 h-screen p-6">
>>>>>>> Stashed changes
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Categories */}
            {/* there is something called Box that acts like a div you can use! 
                refer to other pages like login and signup for refence!
            */}
            <div className="mb-6">
                {/* use Text to replace h3; you can resize with textStyle="sm" as an example, you can search up more about chakra textStyle */}
                {/* there are other options like md, 2xl, etc. */}
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <div className="flex flex-col space-y-2">
                    {/* chakra has styling for checkbox options: go to https://www.chakra-ui.com/docs/components/checkbox  */}
                    <Flex direction="column">
                    {["Apparel", "Electronics", "Free Stuff", "Furniture", "Housing", "Pet Supplies", "Textbooks", "Vehicles"].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-base">{category}</span>
                        </label>
                    ))}
                    </Flex>
                    
                </div>
            </div>

            {/* Location */}
            <div>
                {/* replace with Text */}
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <div className="flex flex-col space-y-2">
                    {/* same changes as earlier */}
                    <Flex direction="column">
                    {["On Campus", "Off Campus"].map((location) => (
                        <label key={location} className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-base">{location}</span>
                        </label>
                    ))}
                    </Flex>
                </div>
            </div>
        </div>
    );
}

export default FilterNavbar;
