import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
