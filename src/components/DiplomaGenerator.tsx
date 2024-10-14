"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type SizeType = 'carta' | 'oficio';
type OrientationType = 'horizontal' | 'vertical';

interface DiplomaStyle {
  width: string;
  height: string;
  border: string;
  padding: string;
  fontFamily: string;
  position: 'relative';
  backgroundColor: string;
}

const DiplomaGenerator: React.FC = () => {
  const [name, setName] = useState<string>('Juan Gabriel Cruz Pérez');
  const [title, setTitle] = useState<string>('Ciclo de Conferencias Magistrales');
  const [subtitle, setSubtitle] = useState<string>('Innovación educativa y excelencia académica');
  const [date, setDate] = useState<string>('del 24 de junio al 05 de julio de 2024');
  const [duration, setDuration] = useState<string>('10 horas');
  const [signerName, setSignerName] = useState<string>('Dra. en Arq. Martha E. Chávez González');
  const [signerTitle, setSignerTitle] = useState<string>('Directora General de Desarrollo del Personal Académico');
  const [size, setSize] = useState<SizeType>('carta');
  const [orientation, setOrientation] = useState<OrientationType>('horizontal');

  const diplomaStyle: DiplomaStyle = {
    width: size === 'carta' ? (orientation === 'horizontal' ? '27.94cm' : '21.59cm') : (orientation === 'horizontal' ? '33.02cm' : '21.59cm'),
    height: size === 'carta' ? (orientation === 'horizontal' ? '21.59cm' : '27.94cm') : (orientation === 'horizontal' ? '21.59cm' : '33.02cm'),
    border: '1px solid black',
    padding: '2cm',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold mb-4">Generador de Diplomas</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre del participante</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="title">Título del evento</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="duration">Duración</Label>
              <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="signerName">Nombre del firmante</Label>
              <Input id="signerName" value={signerName} onChange={(e) => setSignerName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="signerTitle">Cargo del firmante</Label>
              <Input id="signerTitle" value={signerTitle} onChange={(e) => setSignerTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="size">Tamaño</Label>
              <Select value={size} onValueChange={(value: SizeType) => setSize(value)}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Selecciona el tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carta">Carta</SelectItem>
                  <SelectItem value="oficio">Oficio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="orientation">Orientación</Label>
              <Select value={orientation} onValueChange={(value: OrientationType) => setOrientation(value)}>
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Selecciona la orientación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                  <SelectItem value="vertical">Vertical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center min-h-screen">
  <Card>
    <CardContent className="p-4">
      <h3 className="text-xl font-bold mb-4">Vista Previa</h3>
      <div style={diplomaStyle}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Se otorga a</h1>
          <p className="text-4xl font-bold mb-6">{name}</p>
          <p className="text-xl mb-2">por su participación en el</p>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-xl italic mb-4">{subtitle}</p>
          <p className="mb-2">{date}</p>
          <p className="mb-6">con duración de {duration} y valor curricular.</p>
          <p className="mt-12 font-bold">{signerName}</p>
          <p>{signerTitle}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

      
    </div>
  );
};

export default DiplomaGenerator;