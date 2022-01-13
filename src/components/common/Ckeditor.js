import React, { Component } from 'react';
import ReactDOM   from 'react-dom';
import PropTypes  from  'prop-types';

class CKEditor extends React.Component {
  constructor (props) {
    
    super(props)

    this.state={
        debug:false,
        [props.name]:props.textHTML
    }

    this.componentDidMount  = this.componentDidMount.bind(this)
    this.onChange           = this.onChange.bind(this)
    this.count=0;
    this.forceCK()
  }

  forceCK(){

    if(this._editor){

        this._editor.setData(unescape(this.props.textHTML))
    }
  }
  componentDidMount () {
    const {options} = this.props
    let opt = options ? options : {}

    let _this = this

    let confs = {
        language: 'it',
        uiColor: '#2E3E4E',
        filebrowserBrowseUrl: window.host+"/media?langCode=it",
        toolbarGroups: [
				{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
				{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
				{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
				{ name: 'forms', groups: [ 'forms' ] },
				{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
				{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
				{ name: 'links', groups: [ 'links' ] },
				{ name: 'insert', groups: [ 'insert' ] },
				{ name: 'styles', groups: [ 'styles' ] },
				{ name: 'colors', groups: [ 'colors' ] },
				{ name: 'tools', groups: [ 'tools' ] },
				{ name: 'others', groups: [ 'others' ] },
				{ name: 'about', groups: [ 'about' ] }
		],
		removeButtons: 'Save,NewPage,Print,Preview,Templates,Find,Replace,SelectAll,Form,HiddenField,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,Superscript,Subscript,Strike,CopyFormatting,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,About,ShowBlocks,CreateDiv',
    }

    let config = Object.assign(confs,opt);

    try {

        window.CKEDITOR.instances[_this.props.name].destroy(true);            

     } catch (e) { }

    _this._editor = window.CKEDITOR.replace(_this.props.name,config);
    _this._editor.on('change', _this.onChange)
    _this._editor.on('blur', _this.onChange)

    this.debug(_this.props.name);
    this.debug(window.CKEDITOR);
  }

  componentWillUnmount() {
    const {name} = this.props
    this._editor.setData(unescape(''))
    this.setState({textHTML:''})
    try {

        if( window.CKEDITOR.instances[name] ){

            window.CKEDITOR.instances[name].destroy(true);
        }
      
     } catch (e) { }

     this.count = 0
  }

  onChange () {
    let textHTML = this._editor.getData()
    this.setState({[this.props.name]:textHTML})
    this.props.onChange(this.props.name, textHTML)
  }
  debug(txt = null){
    if(this.state.debug){
        if(txt){
            console.log("ck editor debug is true--->>",txt);
        }
        
    }
  }


  render () {

    return (
      <textarea
        style={{display: 'none'}}
        rows='10' cols='80'
        id={this.props.name}
        name={this.props.name}
        defaultValue={unescape(this.props.textHTML)}

      />
    )
  }
}

CKEditor.propTypes = {
  name: PropTypes.string,
  textHTML: PropTypes.string,
  onChange: PropTypes.func
}

CKEditor.defaultProps = {
  name: Math.random().toString(),
  textHTML: '<p></p>',
  onChange: (name, value) => {}
}

export default CKEditor
