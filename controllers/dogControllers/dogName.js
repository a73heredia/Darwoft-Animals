const axios = require('axios');

exports.dogName = async (dog) => {

    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${dog}`)
    const allData = await Promise.all(apiUrl.data)
    const dogsData = allData.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image.url,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
            temperament: el.temperament,
        }
    })
    return dogsData
}
