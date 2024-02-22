import { Account, NextAuthOptions, Profile, Session, User, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
const provider:any = {
  id: "affinidi",
  name: "Affinidi",
  clientId: process.env.AFFINIDI_CLIENT_ID,
  clientSecret: process.env.AFFINIDI_CLIENT_SECRET,
  type: "oauth",
  wellKnown: `${process.env.AFFINIDI_ISSUER}/.well-known/openid-configuration`,
  authorization: {
    params: {
      prompt: "login",
      scope: "openid offline_access",
    },
  },
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  idToken: true,
  profile(profile:any) {
    // console.log("afff profile", profile);
    const profileItems = profile?.custom;

    const email = profileItems.find(
      (item:any) => typeof item.email === "string"
    )?.email;
   
    console.log(email);
    return {
      id: profile.sub,
      email: email,
    };
  },
};

export const authOptions: NextAuthOptions = {
  // debug:true,
  providers: [
   provider
  ],
    secret: process.env.SECRET,
   session: {
    strategy: "jwt",
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return `${baseUrl}/menu/dashboard`;
    // },
    async jwt({ token, account, profile }:{profile?:Profile| undefined,token:JWT,account:Account | null}) {
      const profileItems = (profile as any)?.custom
      console.log("profile", profileItems);
      if (profile && profileItems) {
        let userDID;
        let user:any = {};
        userDID = profileItems.find(
          (item:any) => typeof item.did === "string"
        )?.did;
           user.email = profileItems.find(
          (item:any) => typeof item.email === "string"
        )?.email;
        user.country = profileItems.find(
          (item:any) => typeof item.country === "string"
        )?.country;
        user.name = profileItems.find(
          (item:any) => typeof item.givenName === "string"
        )?.givenName;
        user.gender = profileItems.find(
          (item:any) => typeof item.gender === "string"
        )?.gender;
        user.surname = profileItems.find(
          (item:any) => typeof item.familyName === "string"
        )?.familyName;
        user.city = profileItems.find(
          (item:any) => typeof item.locality === "string"
        )?.locality;
        user.number = profileItems.find(
          (item:any) => typeof item.phoneNumber === "string"
        )?.phoneNumber;
        user.address = profileItems.find(
          (item:any) => typeof item.streetAddress === "string"
        )?.streetAddress;
        user.picture = profileItems.find(
          (item:any) => typeof item.picture === "string"
        )?.picture;
        user.age = profileItems.find(
          (item:any) => typeof item.birthdate === "string"
        )?.birthdate;
        token = {
          ...token,
          user,
          ...(userDID && { userId: userDID }),
        };
      }

      if (account) {
        token = {
          ...token,
          ...(account?.access_token && { accessToken: account.access_token }),
          ...(account?.id_token && { idToken: account.id_token }),
        };
      }

      return token;
    },
   async session({ session, token }: { session: Session, token: JWT }) {
  session.user = token.user as User

  return {
    ...session,
    
  };
}

  },

};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
