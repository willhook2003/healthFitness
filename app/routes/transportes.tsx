import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Transporte } from "~/types";

const mockTransportes: Transporte[] = [
  { 
    id: 1, 
    localidad: "Buenos Aires", 
    destinatario: "Juan Pérez", 
    transporte: "Camión", 
    nCuenta: "CUENTA001", 
    direccion: "Av. Corrientes 1234", 
    horario: "8:00 - 18:00", 
    formPago: "Efectivo", 
    dirDestino: "Calle Florida 567" 
  },
  { 
    id: 2, 
    localidad: "Córdoba", 
    destinatario: "María García", 
    transporte: "Furgón", 
    nCuenta: "CUENTA002", 
    direccion: "San Martín 890", 
    horario: "9:00 - 17:00", 
    formPago: "Transferencia", 
    dirDestino: "Av. Colón 123" 
  },
  { 
    id: 3, 
    localidad: "Rosario", 
    destinatario: "Carlos López", 
    transporte: "Camión", 
    nCuenta: "CUENTA003", 
    direccion: "Pellegrini 456", 
    horario: "7:00 - 19:00", 
    formPago: "Cheque", 
    dirDestino: "Oroño 789" 
  },
  { 
    id: 4, 
    localidad: "Mendoza", 
    destinatario: "Ana Rodríguez", 
    transporte: "Furgón", 
    nCuenta: "CUENTA004", 
    direccion: "San Martín 321", 
    horario: "8:30 - 17:30", 
    formPago: "Efectivo", 
    dirDestino: "Las Heras 654" 
  },
];

export default function TransportesPage() {
  const [transportes, setTransportes] = useState<Transporte[]>(mockTransportes);

  const handleDelete = (id: number) => {
    setTransportes(transportes.filter(transporte => transporte.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transportes</h2>
          <p className="text-muted-foreground">
            Gestiona los transportes del sistema
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Transporte
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Transportes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Localidad</TableHead>
                <TableHead>Destinatario</TableHead>
                <TableHead>Transporte</TableHead>
                <TableHead>N° Cuenta</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Forma Pago</TableHead>
                <TableHead>Dir. Destino</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transportes.map((transporte) => (
                <TableRow key={transporte.id}>
                  <TableCell className="font-medium">{transporte.id}</TableCell>
                  <TableCell>{transporte.localidad || '-'}</TableCell>
                  <TableCell>{transporte.destinatario || '-'}</TableCell>
                  <TableCell>{transporte.transporte || '-'}</TableCell>
                  <TableCell>{transporte.nCuenta || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{transporte.direccion || '-'}</TableCell>
                  <TableCell>{transporte.horario || '-'}</TableCell>
                  <TableCell>{transporte.formPago || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{transporte.dirDestino || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(transporte.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 