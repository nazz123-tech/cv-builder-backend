import { User } from "../models/user.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import { createEmptyResume } from "../services/resumeServices.js";
import { createSession, setSessionCookies} from "../services/auth.js";
import { Session } from "../models/session.js";



export const register = async (req,res)=>{
  const {username ,email, password,} = req.body;
  const existingUser = await User.findOne({email});
  if(existingUser){
      throw createHttpError(409,'Email is in use');
    }
 const hashedPassword =await bcrypt.hash(password,10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const resume = await createEmptyResume(newUser._id, {
    fullname:  username,
    email: email,
  });
  const newSession = await createSession(newUser._id);
  setSessionCookies(res,newSession);
  res.status(201).json({
  user: newUser,
  resumeId: resume._id
});
};

export const login = async (req,res)=>{
  const {email,password}=req.body;
  const user= await User.findOne({email});
  if(!user){
    throw createHttpError(404,"User does not exist");
  }
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid password');
  }
  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookies(res,newSession);
  res.status(200).json(user);
};


export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = session.refreshTokenValidUntil < new Date();
  if (isSessionTokenExpired) {
	await session.deleteOne();
	res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw createHttpError(401, 'Session token expired');
  }
	await session.deleteOne();
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};
