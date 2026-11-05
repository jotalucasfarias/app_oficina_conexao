# Oficina Conexão — App de teste

Aplicação demonstrativa com React, Vite e Supabase.

## Tecnologias

- React 19.3.1
- Vite 8.3.5
- Supabase JS 2.119.0
- CSS responsivo sem biblioteca de componentes

## Executar localmente

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `.env.local` com a URL do projeto e a chave **publishable** do Supabase.

## Banco de dados

No SQL Editor do projeto Supabase escolhido, execute o arquivo `supabase/schema.sql`.

A aplicação insere nomes na tabela `public.nomes_teste`. A política de demonstração permite INSERT para o papel `anon`, mas não libera leitura pública dos registros.

## Deploy na Vercel

Importe este repositório na Vercel. O framework será detectado como Vite; use `npm run build` e diretório de saída `dist`.

Configure estas variáveis nos ambientes Preview e Production:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Nunca coloque uma chave `service_role` ou `sb_secret_...` em variáveis `VITE_*` ou no código do navegador.

## Navegação

O header, a sidebar e o footer têm navegação mockada. A tela de cadastro é a única que executa uma operação no banco.
