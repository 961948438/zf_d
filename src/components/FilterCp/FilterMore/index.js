import React, { Component } from 'react'
import FilterFooter from '../FilterFooter'
import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    selectedValues: this.props.defaultValue
  }

  onTagClick(value) {
    const { selectedValues } = this.state
    const newSelectedValues = [...selectedValues]

    if (newSelectedValues.indexOf(value) <= -1) {
      newSelectedValues.push(value)
    } else {
      const index = newSelectedValues.findIndex(item => item === value)
      newSelectedValues.splice(index, 1)
    }
    this.setState({
      selectedValues: newSelectedValues
    })
  }

  renderFilters(data) {
    const { selectedValues } = this.state
    return data.map(item => {
      const isSelected = selectedValues.indexOf(item.value) > -1
      return (
        <span
          key={item.value}
          className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}
          onClick={() => this.onTagClick(item.value)}
        >
          {item.label}
        </span>
      )
    })
  }
  onCancel = () => {
    this.setState({
      selectedValues: []
    })
  }
  onOk = () => {
    const { type, onSave } = this.props
    onSave(type, this.state.selectedValues)
  }
  render() {
    const {
      data: { roomType, oriented, floor, characteristic },
      onCancel,
      type
    } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.mask} onClick={() => onCancel(type)} />
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>
            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>
            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>
            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>
        <FilterFooter
          className={styles.footer}
          cancelText="清除"
          onCancel={this.onCancel}
          onOk={this.onOk}
        />
      </div>
    )
  }
}
