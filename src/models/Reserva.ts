import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IReserva {
  apartamento: Types.ObjectId;
  codigo_reserva: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: "pendiente" | "confirmada" | "cancelada";
}

const reservaSchema = new Schema<IReserva>(
  {
    apartamento: {
      type: Schema.Types.ObjectId,
      ref: "Apartamento",
      required: true
    },
    codigo_reserva: {
      type: String,
      trim: true,
      required: false
    },
    fecha_inicio: {
      type: Date,
      required: true,
    },
    fecha_fin: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmada", "cancelada"],
      default: "pendiente"
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  }
)


reservaSchema.set('toJSON', {
  transform: function (_doc, ret, _options) {
    ret.fecha_inicio = ret.fecha_inicio.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/(\d+)\/(\d+)\/(\d+)/, "$1-$2-$3");
    ret.fecha_fin = ret.fecha_fin.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/(\d+)\/(\d+)\/(\d+)/, "$1-$2-$3");
    return ret;
  },
});

// 3. Creo el Modelo.
let Reserva: Model<IReserva>;

try {
  Reserva = mongoose.model('Reserva')
} catch (error) {
  Reserva = mongoose.model('Reserva', reservaSchema);
}


export default Reserva;
