exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        succes: true,
        data: 'You got access'
    })
}