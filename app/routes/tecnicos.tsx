import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Tecnico } from "~/types";

const mockTecnicos: Tecnico[] = [
  { id: 1, nombre: "Juan Pérez", email: "juan.perez@retornos.com", telefono: "+54 11 1234-5678", legajo: "TEC001" },
  { id: 2, nombre: "María García", email: "maria.garcia@retornos.com", telefono: "+54 11 2345-6789", legajo: "TEC002" },
  { id: 3, nombre: "Carlos López", email: "carlos.lopez@retornos.com", telefono: "+54 11 3456-7890", legajo: "TEC003" },
  { id: 4, nombre: "Ana Rodríguez", email: "ana.rodriguez@retornos.com", telefono: "+54 11 4567-8901", legajo: "TEC004" },
];

export default function TecnicosPage() {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>(mockTecnicos);

  const handleDelete = (id: number) => {
    setTecnicos(tecnicos.filter(tecnico => tecnico.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Técnicos</h2>
          <p className="text-muted-foreground">
            Gestiona los técnicos del sistema
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Técnico
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Técnicos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Legajo</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tecnicos.map((tecnico) => (
                <TableRow key={tecnico.id}>
                  <TableCell className="font-medium">{tecnico.id}</TableCell>
                  <TableCell>{tecnico.nombre || '-'}</TableCell>
                  <TableCell>{tecnico.legajo || '-'}</TableCell>
                  <TableCell>{tecnico.email || '-'}</TableCell>
                  <TableCell>{tecnico.telefono || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(tecnico.id)}
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