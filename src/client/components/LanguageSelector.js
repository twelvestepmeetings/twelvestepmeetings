import React from 'react';
import reactCSS from 'reactcss';

const styles = reactCSS({
  'default': {
    container: {
      position: 'relative',
      border: '1px solid hsl(0, 0%, 100%)',
      marginLeft: '35px',
      marginRight: '15px',
      padding: '1px 10px 1px 22px',
      borderRadius: '27px',
      color: 'hsl(0, 0%, 100%)',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase',
      fontSize: '12px'
    },
    dropdown: {
      position: 'absolute',
      top: '50px'
    }
  }
});

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    const didClickInside = event.path.indexOf(this.root) > -1;

    if (this.state.open && !didClickInside) {
      this.setState({ open: false });
    }
  }

  render() {
    const languages = ['english', 'spanish', 'japanese', 'russian', 'arabic'];

    return (
      <div
        style={styles.container}
        ref={(c) => { this.root = c; }}
        onClick={() => this.setState({ open: !this.state.open })}
      >
        {languages[0]}
        <i className="material-icons">arrow_drop_down</i>
        <div style={styles.dropdown}>
        {this.state.open && languages.map((language, i) =>
          <div style={styles.language} key={i}>
            {language}
          </div>
        )}
      </div>
      </div>
    );
  }
}

export default LanguageSelector;
