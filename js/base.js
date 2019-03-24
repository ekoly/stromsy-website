stromsy = {
    random: {
        choice: (arr) => arr[Math.floor(Math.random()*arr.length)],
        integer: (ceil) => Math.floor(Math.random()*ceil)
    },
    isTruthey: (obj) => {

        if (obj === false || obj === null || obj === undefined) {
            return false;
        }

        if (typeof obj === "number" && obj === 0) {
            return false;
        }

        if (typeof obj.length === "number" && obj.length === 0) {
            return false;
        }

        return true;

    },
    isFalsey: (obj) => {

        if (obj === false || obj === null || obj === undefined) {
            return true;
        }

        if (typeof obj === "number" && obj === 0) {
            return true;
        }

        if (typeof obj.length === "number" && obj.length === 0) {
            return true;
        }

        return false;

    },

    error_codes: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAYMENT_REQUIRED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404
    },
    getCookie: (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    setCookie: (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
};
