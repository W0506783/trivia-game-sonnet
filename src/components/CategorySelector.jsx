function CategorySelector({ category, setCategory }) {
  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 11, name: "Film" },
    { id: 12, name: "Music" },
    { id: 15, name: "Video Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Computers" },
    { id: 21, name: "Sports" },
    { id: 23, name: "History" },
  ]

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide">
        Select Category
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
      >
        <option value="">Any Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategorySelector