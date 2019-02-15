import { Component } from "react";

// To Set Scroll at the top while switching routes
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        window.scrollTo(0, 0)
    }
    render() {
      return this.props.children
    }
  }

export default ScrollToTop;