-- Script para desabilitar verificação de email no Supabase
-- Execute este SQL no SQL Editor do Supabase Dashboard

-- 1. Desabilitar confirmação de email para novos usuários
UPDATE auth.config 
SET email_confirm_required = false;

-- 2. Confirmar todos os usuários existentes (opcional)
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;

-- 3. Verificar configuração atual
SELECT * FROM auth.config; 