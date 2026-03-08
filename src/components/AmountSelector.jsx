function AmountSelector({ amount, setAmount }) {
  const amounts = [5, 10, 15, 20]

  return (
    <div className="flex flex-col items-center gap-2">
      <select
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-gray-800 text-white border border-neon-cyan rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 w-48"
      >
        <option value="">Any Amount</option>
        {amounts.map((amount) => (
          <option key={amount} value={amount}>
            {amount}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AmountSelector