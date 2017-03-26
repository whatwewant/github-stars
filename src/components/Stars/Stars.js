import React, { PureComponent } from 'react';
import StarItem from './StarItem';
// import classnames from 'classnames';
// import fa from 'font-awesome/css/font-awesome.css';
// import fa from '../../assets/css/font-awesome.css';
import styles from './Stars.css';

class Stars extends PureComponent {

  componentDidMount() {
    this.props.dispatch({ type: 'stars/sync' });
    this.props.dispatch({ type: 'feeds/sync' });
  }

  renderData() {
    const { filteredStars, selectedStarId } = this.props;
    if (!filteredStars.length) {
      return (<div className={styles.empty}>no star found</div>);
    }
    return filteredStars.map(item => (
      <StarItem
        key={item.id}
        data={item}
        keyword={this.props.keyword}
        selected={selectedStarId === item.id}
        dispatch={this.props.dispatch}
      />
    ));
  }

  render() {
    return (
      <div className={styles.normal}>
        {this.renderData()}
      </div>
    );
  }
}

export default Stars;
