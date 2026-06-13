'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';

interface CityAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

// Consulta a API do IBGE para cidades brasileiras
async function searchCities(query: string): Promise<string[]> {
  if (query.length < 3) return [];
  try {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`
    );
    const data: { nome: string; microrregiao: { mesorregiao: { UF: { sigla: string } } } }[] = await res.json();
    const q = query.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return data
      .filter((c) => {
        const nome = c.nome.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
        return nome.startsWith(q);
      })
      .slice(0, 8)
      .map((c) => `${c.nome}, ${c.microrregiao.mesorregiao.UF.sigla}`);
  } catch {
    return [];
  }
}

export default function CityAutocomplete({ label, value, onChange, error, required }: CityAutocompleteProps) {
  const [input, setInput] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setInput(v);
    onChange(v);
    setOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const results = await searchCities(v);
      setSuggestions(results);
      setLoading(false);
    }, 350);
  }

  function handleSelect(city: string) {
    setInput(city);
    onChange(city);
    setSuggestions([]);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="flex flex-col gap-1 relative">
      <label className="text-sm font-medium" style={{ color: '#1E6F30' }}>
        {label}{required && ' *'}
      </label>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Digite o nome da cidade"
        autoComplete="off"
        className="rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
        style={{
          background: '#fafafa',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: error ? '#f87171' : '#c8dfc8',
          color: '#1a1a1a',
        }}
      />

      {open && (loading || suggestions.length > 0) && (
        <ul className="absolute top-full mt-1 w-full z-50 rounded-lg overflow-hidden shadow-xl border" style={{ background: '#ffffff', borderColor: '#c8dfc8' }}>
          {loading && (
            <li className="px-4 py-2 text-sm animate-pulse" style={{ color: '#98BE98' }}>Buscando cidades...</li>
          )}
          {!loading && suggestions.map((city) => (
            <li
              key={city}
              onMouseDown={() => handleSelect(city)}
              className="px-4 py-2 text-sm cursor-pointer transition hover:bg-[#f0faf0]"
              style={{ color: '#1E6F30' }}
            >
              {city}
            </li>
          ))}
          {!loading && suggestions.length === 0 && input.length >= 3 && (
            <li className="px-4 py-2 text-sm" style={{ color: '#98BE98' }}>Nenhuma cidade encontrada</li>
          )}
        </ul>
      )}

      <p className="text-xs" style={{ color: '#98BE98' }}>Apenas cidades brasileiras</p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
