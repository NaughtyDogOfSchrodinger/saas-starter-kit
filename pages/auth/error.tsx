import { AuthLayout } from '@/components/layouts';
import { Alert } from '@/components/shared';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import type { NextPageWithLayout } from 'types';

const AuthError: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { error } = router.query;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Map error codes to user-friendly messages
    if (error) {
      switch (error) {
        case 'Configuration':
          setErrorMessage(t('auth-error-configuration'));
          break;
        case 'AccessDenied':
          setErrorMessage(t('auth-error-access-denied'));
          break;
        case 'Verification':
          setErrorMessage(t('auth-error-verification'));
          break;
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'EmailCreateAccount':
        case 'Callback':
          setErrorMessage(t('auth-error-oauth'));
          break;
        case 'CLIENT_FETCH_ERROR':
          setErrorMessage(t('auth-error-client-fetch'));
          break;
        default:
          setErrorMessage(t('auth-error-default'));
      }
    }
  }, [error, t]);

  return (
    <>
      <Head>
        <title>{t('auth-error-title')}</title>
      </Head>
      <div className="rounded p-6 border">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{t('auth-error-heading')}</h2>
        </div>
        
        {errorMessage && (
          <Alert status="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}
        
        <div className="space-y-4 text-center">
          <p>{t('auth-error-try-again')}</p>
          
          <div className="flex justify-center gap-3">
            <Button onClick={() => router.back()} color="ghost">
              {t('go-back')}
            </Button>
            <Link href="/auth/login">
              <Button color="primary">{t('sign-in')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

AuthError.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout heading="auth-error-title">{page}</AuthLayout>;
};

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

export default AuthError;
