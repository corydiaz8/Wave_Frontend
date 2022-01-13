import React from 'react';
import {paginationText} 			from './Helpers.js';
import ReactPaginate 	from 'react-paginate';

class Pagination extends React.Component {

	render() {
		const{data,countText,handlePageClick} = this.props
		if(!data || data.paging.total_pages == 0){
			return (null)
		}
		return (	
			<div className="row">
				<div className="col-sm-4 hidden-xs"></div>
				<div className="col-sm-4 text-center">
					{paginationText(data,countText)}
				</div>
				<div className="col-sm-4 text-right text-center-xs">                
					<ReactPaginate 
						previousLabel={<i className="fa fa-chevron-left"></i>}
						nextLabel={<i className="fa fa-chevron-right"></i>}
						breakLabel={<a href="#">...</a>}
						breakClassName={"break-me"}
						pageCount={data.paging.total_pages}
						marginPagesDisplayed={1}
						pageRangeDisplayed={2}
						onPageChange={handlePageClick}
						containerClassName={"pagination pagination-sm m-t-none m-b-none"}
						subContainerClassName={"pages pagination"}
						activeClassName={"active"} />
				</div>
			</div>
		);
	}
}
export default Pagination;
