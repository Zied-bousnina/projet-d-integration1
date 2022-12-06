export  function login_validate(values) {
    const errors = {}

    if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }



      // validation Password
      if(!values.password) {
        errors.password = "required"
      }else if(values.password.length < 8 || values.password.length >20) {
        errors.password = "Must be greater than 8 and les than 20 characters long"
      }else if(values.password.includes(" ")) {
        errors.password = "Invalid password"
      }

      return errors;


}

export  function register_validate(values) {
    const errors = {}

    // Email validation
    if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      // userName Validation
      if(!values.userName) {
        errors.userName ="User Name Required"
      }

    //   Cin validate
    if (!values.cin) {
        errors.cin = "Cin Required"
    }
      // validation Password
      if(!values.password) {
        errors.password = "required"
      }else if(values.password.length < 8 || values.password.length >20) {
        errors.password = "Must be greater than 8 and les than 20 characters long"
      }else if(values.password.includes(" ")) {
        errors.password = "Invalid password"
      }

      if(values.cpassword !=values.password) {
        errors.cpassword = "Password Not Match...!"

      }
      return errors;


}

export  function c_chargeValidate(values) {
  const errors = {}

  if (!values.nom) {
      errors.nom = 'Required';
    }

    if (!values.prenom) {
      errors.nom = 'Required';
    }



    // validation Password
    if(!values.cin) {
      errors.cin = "required"
    }else if(values.cin.length < 8 || values.cin.length >8) {
      errors.cin = "Must be 8 characters long"
    }

    return errors;


}


// Validate Add Prof

export  function AddProf_validate(values) {
  const errors = {}

  // Email validation
  if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    // userName Validation
    if(!values.userName) {
      errors.userName ="User Name Required"
    }

  //   Cin validate

    return errors;


}