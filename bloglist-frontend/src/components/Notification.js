import React from 'react'

const Notification = ({ messageErr, messageOk }) => {
  if (messageErr === null && messageOk === null) {
    return null
  }

  if (messageOk !== null) {
    return (
        <div className="ok">
            {messageOk}
        </div>
    )
  }

  if (messageErr !== null) {
    return (
        <div className="error">
            {messageErr}
        </div>
    )
  }
}

export default Notification
