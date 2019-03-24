const stromsy = {
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
    isFalsey: (obj) => !isTruthey(obj)
};
