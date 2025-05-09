const Pagination = (props) => {

  const {totalPages, setCurrentPage, currentPage} = props;

  const renderPagination = () => {
    const buttons = [];
    for(let i = 0; i < totalPages; i++) {
      buttons.push(
        <button 
        key={i + 1} 
        onClick={() => setCurrentPage(i + 1)} 
        className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
        >
        {i + 1}
        </button>
      )
    }
    return buttons;
  }
  
  return (
    <div className="pagination">
      {renderPagination()}
    </div>    
  )
}

export default Pagination;
