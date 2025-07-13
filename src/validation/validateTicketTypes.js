import Joi from 'joi';

const ticketTypeSchema = Joi.object({
  price: Joi.number().integer().min(0).required(),
  seatRequired: Joi.boolean().required(),
  requiredFor: Joi.array().items(Joi.string()).optional(),
});

const ticketTypesSchema = Joi.object().pattern(
  Joi.string().valid('ADULT', 'CHILD', 'INFANT'),
  ticketTypeSchema
);

export const validateTicketTypes = (config) => {
  const { error } = ticketTypesSchema.validate(config);
  if (error) {
    throw new Error(`Invalid ticketTypes config: ${error.message}`);
  }
};
