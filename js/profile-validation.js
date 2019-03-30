(()=>{
    const password_validator = new FormValidator("password-form", [{
        name: "old-password",
        rules: "required"
    }, {
        name: "new-password",
        rules: "required|min_length(8)"
    }, {
        name: "confirm-new-password",
        rules: "required|matches[new-password]"
    }], (errors, event) => {
        console.log(errors);
    });
})();
