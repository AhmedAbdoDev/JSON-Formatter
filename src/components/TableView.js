export default function TableView({ data }) {
  if (!data) return null;

  const isArrayOfObjects =
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" && !Array.isArray(item) && item !== null
    );

  if (!isArrayOfObjects) {
    return (
      <div className="p-4 text-red-400">
        Cannot display data as a table. Input must be an array of objects.
      </div>
    );
  }

  const headers = Object.keys(data[0] || {});

  return (
    <div className="p-4 text-sm overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="border-b border-gray-700">
          <tr>
            {headers.map((key) => (
              <th
                key={key}
                className="px-4 py-2 text-left font-medium text-gray-400"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 hover:bg-gray-700 transition-colors duration-200"
            >
              {headers.map((key, idx) => (
                <td
                  key={idx}
                  className="px-4 py-2 whitespace-nowrap text-gray-300"
                >
                  {typeof item[key] === "object"
                    ? JSON.stringify(item[key])
                    : String(item[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
