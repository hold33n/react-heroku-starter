import React from 'react'

export default class ScrollToTopOnMount extends React.Component<{}, {}> {
  public componentDidMount() {
    window.scrollTo(0, 0)
  }

  public render() {
    return <div/>
  }
}
