import React from 'react';
import { Link } from 'react-router-dom'
const NotAuthorized = (props) => {

  return (
    <section id="content">
    	<div className="row m-n">
    		<div className="col-sm-4 col-sm-offset-3">
    			<div className="text-center m-b-lg">
    				<h5 style={{fontSize: '82px'}} className="h text-white animated fadeInDownBig">Non Autorizzato</h5>
    			</div>
    		<div className="list-group m-b-sm bg-white m-b-lg">
	    		<Link to={window.basepath+"/"} className="list-group-item">
	    			<i className="fa fa-chevron-right icon-muted"></i>
	    			<i className="fa fa-fw fa-home icon-muted"></i>
                    Vai alla home
	    		</Link>
    		</div>
    		</div>
    	</div>
    </section>
  );
};

export default NotAuthorized;
