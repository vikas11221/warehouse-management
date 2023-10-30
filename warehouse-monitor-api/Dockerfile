FROM node:14.15.0-alpine As build

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copy only necessary files to install dependencies
COPY --chown=node:node package.json yarn.lock tsconfig.json ./

COPY --chown=node:node . ./

USER node

RUN yarn --frozen-lockfile

RUN yarn build

# Remove dependencies, to only install production afterwards
RUN rm -rf node_modules

# Install dependencies, except devDependencies
RUN yarn --frozen-lockfile --production

# Use multi staged build for smaller images
FROM node:14.15.0-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ENV NODE_ENV production

# Copy package.json, might be used internally
COPY --from=build /home/node/app/package.json ./

USER node

# Copy artifacts from previous image
COPY --from=build --chown=node:node /home/node/app/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/app/dist ./dist
COPY --from=build --chown=node:node /home/node/app/ormconfig.js ./

CMD [ "yarn", "start:prod" ]
