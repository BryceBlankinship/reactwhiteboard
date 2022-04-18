import { OAuth2Client } from "google-auth-library";

const clientId = "853462108886-geg5b379q8p728m7drhv9nlaqmvlg38s.apps.googleusercontent.com";

const client = new OAuth2Client(clientId);

export const googleAuth = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId
    });
    const payload = ticket.getPayload();

    console.log(`User ${payload.name} verified.`)

    const { sub, email, name, picture } = payload;
    const userId = sub;
    return { userId, email, fullName: name, photoUrl: picture };
}