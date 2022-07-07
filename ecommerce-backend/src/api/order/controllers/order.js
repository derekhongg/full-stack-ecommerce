'use strict';
const { sanitizeEntity } = require('strapi-utils')

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = {
    async find(ctx) {
        const { user } = ctx.state
        let entities
        if(ctx.query._q) {
            entities = await strapi.services.order.search(ctx.query)
        } else {
            entities = await strapi.services.order.find(ctx.query)
        }

        return entities.map(entity => sanitizeEntity(entity, {model: strapi.models.order}))
    }
}
