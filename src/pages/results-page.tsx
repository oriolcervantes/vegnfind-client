import Navbar from '../components/navbar';
import ResultsList from '../components/results-list';
import SearchContainer from '../components/search-container';

function Results() {
  return (
    <div className="results-page">
      <Navbar />
      <br />
      <div>
        <strong>RESULTS PAGE</strong>
      </div>
      <br />
      <SearchContainer />
      <br />
      <ResultsList />
      <br />
    </div>
  );
}

export default Results;
