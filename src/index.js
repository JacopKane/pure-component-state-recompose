import React from 'react'
import { render } from 'react-dom'
import { compose, pure, withState } from 'recompose'

const appStyles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  border: '1px solid black',
  padding: '1em',
}

const pureStyles = {
  border: '1px solid red',
  padding: '1em',
}

const log = (value, ...extra) => {
  console.log(...extra, value)
  return value
}

const PureElement = ({ visible, toggleVisibility }) => (
  <div style={pureStyles}>
    <h2>Pure Component</h2>
    <p>This element and component is completely pure</p>
    <button
      onClick={event =>
        toggleVisibility(visible => log(!visible, 'toggle visibility'))
      }>
      Toggle
    </button>
    {visible && <p>Visible</p>}
  </div>
)

const Pure = pure(PureElement)

const withVisibility = withState('visible', 'toggleVisibility', false)

const AppElement = ({ visible, toggleVisibility }) => (
  <div style={appStyles}>
    <h1>App Component</h1>
    <p>This element is pure but the main component is not</p>
    <p>
      We can call this as a container since the state is changing here and
      passing down
    </p>
    <Pure visible={visible} toggleVisibility={toggleVisibility} />
  </div>
)

const App = compose(withVisibility, pure)(AppElement)

render(<App />, document.getElementById('root'))
