import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

const stylesheet = {
  'default': {
    container: {
      position: 'relative',
      border: '2px solid hsl(0, 0%, 100%)',
      marginLeft: '35px',
      marginRight: '15px',
      padding: '6px 18px 6px 27px',
      borderRadius: '27px',
      color: 'hsl(0, 0%, 100%)',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase'
    },
    dropdown: {
      position: 'absolute',
      top: '50px'
    },
    item: {
      display: 'block',
      margin: '10px 0',
      textAlign: 'left'
    }
  }
};

const propTypes = {

  /**
   * Items to render in the dropdown list.
   */
  items: PropTypes.array.isRequired,

  /**
   * The index of the selected item.
   */
  selected: PropTypes.number.isRequired,

  /**
   * Callback fired when a dropdown item is selected.
   */
  onSelect: PropTypes.func.isRequired,

  /**
   * Styles on individual dropdown items
   */
  itemStyle: PropTypes.object
};

class Dropdown extends React.Component {
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
    const styles = reactCSS(stylesheet);

    return (
      <div
        style={{ ...styles.container, ...this.props.style }}
        ref={(c) => { this.root = c; }}
        onClick={() => this.setState({ open: !this.state.open })}
      >
        {this.props.items[this.props.selected]}
        <i className="material-icons">arrow_drop_down</i>
        <div style={styles.dropdown}>
          {this.state.open && this.props.items.map((item, i) =>
            <a
              onClick={() => this.props.onSelect(item, i)}
              key={i}
              style={{...styles.item, ...styles.itemStyle }}
            >
              {item}
            </a>
          )}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = propTypes;

export default Dropdown;
