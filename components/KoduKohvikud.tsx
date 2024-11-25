import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase kliendi loomine keskkonnamuutujate kaudu
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const Kodukohvikud = () => {
  const [cafes, setCafes] = useState<any[]>([]);

  useEffect(() => {
    // Andmete laadimine Supabase-st
    const fetchCafes = async () => {
      const { data, error } = await supabase
        .from('cafes')
        .select('id, name, aadress, description, opening_date, closing_date');

      if (error) {
        console.error('Error fetching cafes:', error);
      } else {
        setCafes(data || []);
      }
    };

    fetchCafes();
  }, []);

  return (
    <div className="min-h-screen flex  justify-center bg-white rounded-lg p-4">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-5 gap-4 text-center border-b-2 border-black mb-4">
          <div className="font-semibold">Nimi</div>
          <div className="font-semibold">Aadress</div>
          <div className="font-semibold">Kirjeldus</div>
          <div className="font-semibold">Avamine</div>
          <div className="font-semibold">Sulgemine</div>
        </div>

        {cafes.length > 0 ? (
          cafes.map((cafe) => (
            <div key={cafe.id} className="grid grid-cols-5 gap-4 text-center border-b border-black py-2">
              <div>{cafe.name}</div>
              <div>{cafe.aadress}</div>
              <div>{cafe.description}</div>
              <div>{new Date(cafe.opening_date).toLocaleDateString()}</div>
              <div>{new Date(cafe.closing_date).toLocaleDateString()}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">Hetkel ei ole kodukohvikuid andmebaasis.</p>
        )}
      </div>
    </div>
  );
};

export default Kodukohvikud;
