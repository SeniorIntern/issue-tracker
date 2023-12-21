import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <main>
      <p>Hello World</p>
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
    </main>
  )
}
