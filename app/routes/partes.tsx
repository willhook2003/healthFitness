import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Parte } from "~/types";

const mockPartes: Parte[] = [
  { id: 1, partNumber: "P001", descripcion: "Motor Eléctrico 5HP - Motor eléctrico de 5 caballos de fuerza" },
  { id: 2, partNumber: "P002", descripcion: "Bomba Hidráulica - Bomba hidráulica para sistemas de presión" },
  { id: 3, partNumber: "P003", descripcion: "Válvula de Control - Válvula de control automática" },
  { id: 4, partNumber: "P004", descripcion: "Sensor de Temperatura - Sensor digital de temperatura" },
  { id: 5, partNumber: "P005", descripcion: "Cable Eléctrico 10m - Cable eléctrico de 10 metros" },
  { id: 6, partNumber: null, descripcion: "Repuesto genérico sin número de parte" },
];

export default function PartesPage() {
  const [partes, setPartes] = useState<Parte[]>(mockPartes);

  const handleDelete = (id: number) => {
    setPartes(partes.filter(parte => parte.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Partes</h2>
          <p className="text-muted-foreground">
            Gestiona el inventario de partes y repuestos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Parte
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Partes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>N° Parte</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partes.map((parte) => (
                <TableRow key={parte.id}>
                  <TableCell className="font-medium">{parte.id}</TableCell>
                  <TableCell>
                    {parte.partNumber ? (
                      <Badge variant="outline">{parte.partNumber}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Sin número</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate" title={parte.descripcion || ''}>
                      {parte.descripcion || '-'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(parte.id)}
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