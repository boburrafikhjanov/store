import React, { Component } from 'react'

export default class Script extends Component {
  componentDidMount() {
    const s = document.createElement('script')
    // s.type = 'text/javascript'
    s.async = true
    s.innerHTML = `http://bitrix.bs24.uz/upload/crm/tag/call.tracker.js`
    s.src =
      'http://bitrix.bs24.uz/upload/crm/tag/call.tracker.js' +
      '?' +
      ((Date.now() / 60000) | 0)
    this.instance.appendChild(s)
    const h = document.getElementsByTagName('script')[0]
    h.parentNode.insertBefore(s, h)
  }

  render() {
    return <div ref={(el) => (this.instance = el)}></div>
  }
}