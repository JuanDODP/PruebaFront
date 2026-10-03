import { useState, type ReactNode } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import PublicOutlined from '@mui/icons-material/PublicOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import type { Result } from '@/interface/ApiData.Interface'
import { DURATION, EASE_OUT, fadeInUp, REDUCED_MOTION, staggerDelay } from '@/theme/motion'
import { GENDER_META, translatePlace, translateSpecies } from './characterMeta'
import { StatusBadge } from './StatusBadge'

interface CardProps {
  character: Result
  // Posición en la lista, usada para escalonar la animación de entrada
  index?: number
}

const InfoRow = ({ icon: Icon, label, children }: { icon: SvgIconComponent; label: string; children: ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
    <Box
      sx={{
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: 1.5,
        display: 'grid',
        placeItems: 'center',
        color: 'primary.main',
        bgcolor: 'rgba(31, 58, 95, 0.07)',
        transition: `background-color ${DURATION.base}ms ${EASE_OUT}, color ${DURATION.base}ms ${EASE_OUT}`,
        '.character-card:hover &': { bgcolor: 'primary.main', color: 'primary.contrastText' },
      }}
    >
      <Icon sx={{ fontSize: 18 }} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="caption"
        component="p"
        sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.6, fontSize: 10.5, lineHeight: 1.4 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" noWrap title={typeof children === 'string' ? children : undefined} sx={{ fontWeight: 600 }}>
        {children}
      </Typography>
    </Box>
  </Box>
)

export const Card = ({ character, index = 0 }: CardProps) => {
  const { name, image, status, species, gender, origin, location } = character
  const [imageLoaded, setImageLoaded] = useState(false)
  const { label: genderLabel, icon: GenderIcon } = GENDER_META[gender]

  return (
    <Paper
      component="article"
      variant="outlined"
      className="character-card"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        animation: `${fadeInUp} ${DURATION.slow}ms ${EASE_OUT} both`,
        animationDelay: staggerDelay(index),
        transition: `transform ${DURATION.base}ms ${EASE_OUT}, box-shadow ${DURATION.base}ms ${EASE_OUT}, border-color ${DURATION.base}ms ${EASE_OUT}`,
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'primary.light',
            boxShadow: '0 18px 36px -12px rgba(19, 39, 67, 0.35)',
          },
          '&:hover .character-card__image': { transform: 'scale(1.06)' },
        },
        [REDUCED_MOTION]: {
          animation: 'none',
          '&:hover': { transform: 'none' },
          '&:hover .character-card__image': { transform: 'none' },
        },
      }}
    >
      {/* Imagen con degradado para que el nombre sea legible sobre cualquier foto */}
      <Box sx={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', bgcolor: 'grey.200' }}>
        <Box
          component="img"
          className="character-card__image"
          src={image}
          alt={name}
          width={300}
          height={300}
          loading="lazy"
          decoding="async"
          // Si la imagen ya estaba en caché, `onLoad` pudo dispararse antes de montar el componente
          ref={(node: HTMLImageElement | null) => {
            if (node?.complete) setImageLoaded(true)
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: imageLoaded ? 1 : 0,
            transition: `opacity ${DURATION.slow}ms ${EASE_OUT}, transform 600ms ${EASE_OUT}`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(19, 39, 67, 0.92) 0%, rgba(19, 39, 67, 0.35) 38%, transparent 60%)',
          }}
        />
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <StatusBadge status={status} />
        </Box>
        <Box sx={{ position: 'absolute', left: 16, right: 16, bottom: 14, color: 'common.white' }}>
          <Typography
            variant="h6"
            component="h3"
            title={name}
            sx={{ lineHeight: 1.25, fontSize: '1.125rem', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
            noWrap
          >
            {name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {translateSpecies(species)}
          </Typography>
        </Box>
      </Box>

      <Stack spacing={1.75} sx={{ p: 2, flex: 1 }}>
        <InfoRow icon={GenderIcon} label="Género">
          {genderLabel}
        </InfoRow>
        <InfoRow icon={PublicOutlined} label="Origen">
          {translatePlace(origin.name)}
        </InfoRow>
        <InfoRow icon={PlaceOutlined} label="Ubicación">
          {translatePlace(location.name)}
        </InfoRow>
      </Stack>
    </Paper>
  )
}
