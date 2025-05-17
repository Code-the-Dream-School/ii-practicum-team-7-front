const Pagination = (props) => {

  const {totalPages, setCurrentPage, currentPage} = props;

  const renderPagination = () => {
    const buttons = [];
    for(let i = 0; i < totalPages; i++) {
      buttons.push(
        <button 
        key={i + 1} 
        onClick={() => setCurrentPage(i + 1)} 
        className={`
          bg-black text-ny-pink-light px-1.5 rounded-md min-w-[21px] mx-1
          ${currentPage === i + 1 ? 'active' : ''}
          `}
        >
        {i + 1}
        </button>
      )
    }
    return buttons;
  }
  
  return (
    <div className="bg-ny-pink-light py-8">
      {renderPagination()}
    </div>    
  )
}

export default Pagination;
