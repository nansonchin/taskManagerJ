async function fetchIssues() {
  try {
    const url = "https://dummyjson.com/todos";
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await result.json()
    return data;
  } catch (error) {
    console.error("Failed to fetchIssues", error)
    throw error
  }
}


export default fetchIssues
