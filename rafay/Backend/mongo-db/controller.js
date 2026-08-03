const {Form} = require('./model');

const createForm =(req, res) => {
    const { name, email, attendence } ;
};
const getForm = (req, res) => {
    Form.find()
        .then(forms => {
            res.json(forms);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to fetch forms' });
        });
};

module.exports = { createForm, getForm };