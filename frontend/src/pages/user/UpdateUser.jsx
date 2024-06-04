import React from 'react'
import UpdateUserForm from '../../components/User/UpdateUserForm'

import "./UpdateUser.css"

const UpdateUser = () => {
  return (
    <div className="grid p-6 grid-nogutter">
      <div className="col-12 animated-user-form">
        <UpdateUserForm />
      </div>
    </div>
  )
}

export default UpdateUser