import React, { Component } from 'react'

export default class Script extends Component {
  componentDidMount() {
    const s = document.createElement('script')
    // s.type = 'text/javascript'
    s.async = true
    s.innerHTML = `https://bitrix.bs24.uz/upload/crm/site_button/loader_1_xzmrha.js`
    s.src =
      'https://bitrix.bs24.uz/upload/crm/site_button/loader_1_xzmrha.js' +
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


