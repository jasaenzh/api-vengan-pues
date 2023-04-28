import mongoose, { Document, Model, model, models, Schema, Types, } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

type IApartamento = mongoose.Document & {
  numeroApartamento: string;
  ubicacion: string;
  areaMts: number;
  precio: number;
  duplex?: boolean;
  habitaciones: number;
  camasDobles: number;
  camasSencillas: number;
  camaNido: number;
  banos: number;
  aguaCaliente?: boolean;
  secadorCabello: number;
  salaEstar?: boolean;
  comedor: number;
  sofaCama: number;
  televisor: number;
  internet?: boolean;
  cocina?: boolean;
  nevera?: boolean;
  lavadora?: boolean;
  microondas?: boolean;
  cafetera?: boolean;
  licuadora?: boolean;
  tostadoraPan?: boolean;
  ollaPresion?: boolean;
  ollaArrocera?: boolean;
  sanduchera?: boolean;
  camaraSeguridad?: boolean;
  terrazaVista?: boolean;
};

const apartamentoSchema = new Schema({
  numeroApartamento: {
    type: String,
    require: [true, "Numero de apartamento es requerido"],
    trim: true,
    unique: true,
  },
  ubicacion: {
    type: String,
    require: [true, "La ubicacion es requerida"],
    trim: true,
  }, areaMts: {
    type: Number,
    require: [true, "Los metros cuadrados son requeridos"],
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: "El valor de mts debe ser mayor que cero",
    },
  },
  precio: {
    type: Number,
    require: [true, "El precio es requerido"],
    validate: {
      validator: function (value: number) {
        return value >= 0;
      },
      message: "El precio debe ser mayor que cero",
    },
  },
  duplex: {
    type: Boolean,
    default: false,
  },
  habitaciones: {
    type: Number,
    require: [true, "El numero de habitaciones es requerida"],
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: "El valor del numero de habitaciones, debe ser mayor que cero",
    },
  },
  camasDobles: {
    type: Number,
    require: [true, "El numero de camas dobles es requerido"],
    validate: {
      validator: function (value: number) {
        return value >= 0;
      },
      message: "El valor de camas dobles debe ser mayor que cero",
    },
  },
  camasSencillas: {
    type: Number,
    require: [true, "El numero de camas sencillas es requerido"],
    validate: {
      validator: function (value: number) {
        return value >= 0;
      },
      message: "El valor de camas sencillas debe ser mayor que cero",
    },
  },
  camaNido: {
    type: Number,
    require: [true, "El numero de camas tipo nido es requerida"],
    validate: {
      validator: function (value: number) {
        return value >= 0;
      },
      message: "El valor de cama Nido debe ser mayor que cero",
    },
  },
  banos: {
    type: Number,
    require: [true, "El numero de baños es requerido"],
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: "El valor de baños debe ser mayor que cero",
    },
  },
  aguaCaliente: {
    type: Boolean,
    default: false,
  },
  secadorCabello: {
    type: Number,
    require: [true, "El numero de secador para el cabello es requerido"],
    validate: {
      validator: function (value: number) {
        return value >= 0;
      },
      message: "El valor de numero de secadores, debe ser mayor que cero",
    },
  },
  salaEstar: {
    type: Boolean,
    default: false,
  },
  comedor: {
    type: Number,
    require: [true, "El numero de comedor es requerido"],
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: "El valor de comedor, debe ser mayor que cero",
    },
  },
  sofaCama: {
    type: Number,
    require: [true, "El numero de sofa camas es requerido"],
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: "El valor de sofa cama, debe ser mayor que cero",
    },
  },
  televisor: {
    type: Number,
    require: [true, "El numero de televisores es requerido"],
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: "El valor de televisor, debe ser mayor que cero",
    },
  },
  internet: {
    type: Boolean,
    default: false,
  },
  cocina: {
    type: Boolean,
    default: false,
  },
  nevera: {
    type: Boolean,
    default: false,
  },
  lavadora: {
    type: Boolean,
    default: false,
  },
  microondas: {
    type: Boolean,
    default: false,
  },
  cafetera: {
    type: Boolean,
    default: false,
  },
  licuadora: {
    type: Boolean,
    default: false,
  },
  tostadoraPan: {
    type: Boolean,
    default: false,
  },
  ollaPresion: {
    type: Boolean,
    default: false,
  },
  ollaArrocera: {
    type: Boolean,
    default: false,
  },
  sanduchera: {
    type: Boolean,
    default: false,
  },
  camaraSeguridad: {
    type: Boolean,
    default: false,
  },
  terrazaVista: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: true,
});

apartamentoSchema.plugin(mongoosePagination);

const Apartamento: Pagination<IApartamento> = (models.Apartamento as Pagination<IApartamento>) || mongoose.models.Apartamento || mongoose.model<IApartamento, Pagination<IApartamento>>("Apartamento", apartamentoSchema);


export default Apartamento;