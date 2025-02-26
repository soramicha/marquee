function FilterNavbar() {
    return (
        <div className="w-64 h-screen p-6 bg-gray-200">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <div className="flex flex-col space-y-2">
                    {["Apparel", "Electronics", "Free Stuff", "Furniture", "Housing", "Pet Supplies", "Textbooks", "Vehicles"].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-base">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Location */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <div className="flex flex-col space-y-2">
                    {["On Campus", "Off Campus"].map((location) => (
                        <label key={location} className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-base">{location}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterNavbar;
